#include<omp.h>
#include<stdio.h>
#include<mpi.h>

int main(int argc , char **argv){
    int my_rank;
    int size;
    MPI_Init(&argc, &argv); //start mpi
    //determine rank of the processor
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    //determine total number of processors
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    printf("Hello world!! I'm rank %d of size %d\n",my_rank,size);
    MPI_Finalize(); //exit mpi
}

/*
    MPI_Comm_rank(,)  returns the processor id assigned to each processor during startup. 
    MPI_Comm_size(,) returns the total number of processors.
*/