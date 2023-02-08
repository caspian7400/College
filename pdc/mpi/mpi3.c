#include<stdio.h>
#include<omp.h>
#include<mpi.h>

int main(int argc, char const *argv[])
{
    int my_rank;
    int partner;
    int size,i,t;
    char greeting[100];
    MPI_Status stat;
    MPI_Init(&argc,&argv);
    MPI_Comm_rank(MPI_COMM_WORLD,&my_rank);
    MPI_Comm_size(MPI_COMM_WORLD,&size);
    sprintf(greeting,"hello world : processor %d of %d\n",my_rank,size);
    // if(my_rank == 1) for(i = 0 ; i<1000000000 ; i++);
    if (my_rank == 1){
        fputs(greeting,stdout);
        // for (partner = 1 ; partner < sizeof(greeting) , partner++)
    }
    return 0;
}
