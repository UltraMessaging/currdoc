/*
"umestored_example.c: application that shows how to call the
"  umestored_main API to start a UMP store daemon.

  Copyright (c) 2005-2019 Informatica Corporation  Permission is granted to licensees to use
  or alter this software for any purpose, including commercial applications,
  according to the terms laid out in the Software License Agreement.

  This source code example is provided by Informatica for educational
  and evaluation purposes only.

  THE SOFTWARE IS PROVIDED "AS IS" AND INFORMATICA DISCLAIMS ALL WARRANTIES 
  EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF 
  NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR 
  PURPOSE.  INFORMATICA DOES NOT WARRANT THAT USE OF THE SOFTWARE WILL BE 
  UNINTERRUPTED OR ERROR-FREE.  INFORMATICA SHALL NOT, UNDER ANY CIRCUMSTANCES, BE 
  LIABLE TO LICENSEE FOR LOST PROFITS, CONSEQUENTIAL, INCIDENTAL, SPECIAL OR 
  INDIRECT DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE 
  TRANSACTIONS CONTEMPLATED HEREUNDER, EVEN IF INFORMATICA HAS BEEN APPRISED OF 
  THE LIKELIHOOD OF SUCH DAMAGES.
*/

#ifdef __VOS__
#define _POSIX_C_SOURCE 200112L 
#include <sys/time.h>
#endif
#if defined(__TANDEM) && defined(HAVE_TANDEM_SPT)
	#include <ktdmtyp.h>
	#include <spthread.h>
#endif

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#ifdef _WIN32
	#include <winsock2.h>
	#include <sys/timeb.h>
	#define strcasecmp stricmp
#else
	#include <errno.h>
	#include <unistd.h>
	#include <netinet/in.h>
	#include <arpa/inet.h>
	#include <signal.h>
	#include <sys/prctl.h>
	#include <sys/time.h>
	#if defined(__TANDEM)
		#include <strings.h>
	#endif
#endif

#include <lbm/lbm.h>
#include <lbm/umestored_main.h>

int child_ok = 1;
pid_t process_id;

static void sigchld_handler(int sig)
{
	printf("Detected SIGCHLD, child process exited, exiting parent too\n");
	child_ok = 0;

}

static void sigint_handler(int sig)
{
	printf("Detected SIGINT, sending signal to child \n");
	child_ok = 0;

	/* we know we are killing the child process, so ignore the sigchld */
	signal(SIGCHLD, SIG_IGN);

}

int main(int argc, char **argv)
{
	int pipefd[2];
	char child_msg[2048];

	/*
	 * Ignore SIGPIPE on UNIXes which can occur when writing to a socket
	 * with only one open end point.
	 */
	signal(SIGPIPE, SIG_IGN);

	/* Parent to handle the child going down */
	signal(SIGCHLD, sigchld_handler);

	/* send a SIGINT to the child process when we receive one */
	signal(SIGINT, sigint_handler);

	/* Pipes to handle STDOUT/STDERR */
	pipe(pipefd);

	process_id = fork();
	if (process_id < 0) /* failed to fork */
	{
		printf("FAILURE: fork() returned an error (%d)!!!\n", process_id);
	}
	else if (process_id == 0) /* this is the child process */
	{
		int rtn;

		printf("Child Process!!!\n");

		/*
		 * Usually, we don't want the parent and child sharing the same FD's.
		 * STDIN, STDOUT, and STDERR shown here (but after we print above).
		 */
		close(0);
		close(1);
		close(2);

		/*
		 * Now dup the writable end of the pipe so that we can
		 * redirect STDOUT/STDERR to the parent for printing.
		 * Also close the readable end since we won't be reading 
		 * from the pipe.
		 */
		dup2(pipefd[1], 1);
		dup2(pipefd[1], 2);
		close(pipefd[0]);

		/* Ask for SIGINT handler when parent dies. Store will handle it and exit (Linux only). */
		prctl(PR_SET_PDEATHSIG, SIGINT);

		/* Change the command to the store daemon */
		argv[0] = "./umestored";

		rtn = umestored_main(argc, argv);
		if (rtn == -1) {
			printf("ERROR: (%d) (%s)\n", errno, strerror(errno));
			exit(0); /* it failed */
		}
	}
	else /* this is the parent process: just continue on processing */
	{
		int x;

		dup(pipefd[0]);
		close(pipefd[1]);

		printf("Parent Process: PID of child(%d)!!!\n", process_id);

		/*
		 * read from the pipe and print out any messages from the child process
		 */
		while (child_ok == 1) {
			x = read(pipefd[0], child_msg, sizeof(child_msg));
			if (x > 0) {
				printf("[child:%d] %s", process_id, child_msg);
			}
		}

		/*
		 * wait for the child process to fininsh shutting down
		 */
		while(wait() > 0) {
			/* no op */
		}
	
		printf("[parent] Exiting Parent process now\n");

	}

	return 0;
}


