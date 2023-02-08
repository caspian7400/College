#include<omp.h> //mpi stands for message passsing interface
#include<stdio.h>

int main(int argc, char **argv){
    MPI_Init(&argc,&argv);  // start mpi
    printf("hello world!!!!!!\n");
    MPI_Finalize(); //exit mpi
}

/*  the specified number of processors will perform
    the same task. MPI_Init must be called first and 
    MPI_Finalize called last , so it forms a sort of 
    wrapper around the body of the parallel code.
*/