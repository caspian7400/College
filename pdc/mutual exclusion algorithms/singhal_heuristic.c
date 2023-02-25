#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <unistd.h>
#define N 4

struct site
{
    char SV[N];
    int SN[N];
};

struct token
{
    int TSV[N], TSN[N];
};

struct site s1, s2, s3, s4;
struct site *arr[] = {&s1, &s2, &s3, &s4};
struct token t;

void initialise_nodes();

int main()
{
    for (int i = 0; i < N; i++)
    {
        t.TSN[i] = 0;
        t.TSV[i] = 0;
    }
    initialise_nodes();
    // we initialise site 1 to hold thetoken
    s1.SV[0] = 'H';
    printf("halt");
    return 0;
}

void initialise_nodes()
{
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            arr[i]->SN[j] = 0;
            if (j < i)
                arr[i]->SV[j] = 'R';
            else
                arr[i]->SV[j] = 'N';
        }
    }
    return;
}