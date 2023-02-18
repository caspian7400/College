#include <stdio.h>
#include<stdlib.h>
#include <stdbool.h>
#include <unistd.h>
#define N 4

// defining structures
int front = -1, rear = -1;
int *f = &front, *r = &rear;
struct token
{
    int q[N];
    int ln[N]; 
};

struct site
{
    bool is_token;
    int rn[N];
};
struct site s1, s2, s3, s4;
struct token token;
struct site *s[N] = {&s1, &s2, &s3, &s4};

struct site initialise_site(struct site);
struct token initialise_token(struct token);
void request(int, int);
void release(int);
bool in_queue(int);
int dequeue();
void enqueue(int val);

int main()
{
    s1 = initialise_site(s1);
    s2 = initialise_site(s2);
    s3 = initialise_site(s3);
    s4 = initialise_site(s4);
    token = initialise_token(token);

    // initially s3 has the token 
    s2.is_token = true;
    printf("site 2 has the token\n");
    sleep(1.5);
    // sites and tokens initialised
    
    // we need to generate requests to enter CS , then execute CS and then exit CS
    //  request generatiSon can be done at random
    int id = rand()%4+1;
    enqueue(1);
    enqueue(2);
    enqueue(3);
    enqueue(4);
    request(id,s[id]->rn[id]++);
    return 0;
}

// to initialise site data structures
struct site initialise_site(struct site s)
{
    s.is_token = false;
    for (int i = 0; i < N; i++)
    {
        s.rn[i] = 0;
    }
    return s;
}

// to initialise token data structures
struct token initialise_token(struct token t)
{
    for (int i = 0; i < N; i++)
    {
        t.ln[i] = 0;
    }
    return t;
}

void request(int i, int sn)
{
    if (s[i]->is_token == true)
    {
        printf("site %d is entering the critical section\n", i+1);
        sleep(1.5);
    }
    else
    {
        for (int j = 0; j < N; j++)
        {
            if (j == i)
                continue;
            printf("site %d sent request to site %d\n", i+1, j+1);
            sleep(1);

            s[j]->rn[i] = sn > s[j]->rn[i] ? sn : s[j]->rn[i];
            // site j sets rn[i] = max(rn[i],sn)
            // check whether request is outstanding
            if (s[j]->rn[i] = token.ln[i] + 1)
            {
                if (s[j]->is_token == false)
                    continue;
                printf("token is being sent to site %d by site %d\n", i+1, j+1);
                sleep(1.5);
                printf("site %d has the token\n", i+1);
                sleep(1.5);
                printf("site %d is entering critical section\n", i+1);
                sleep(1.5);
            }
        }
    }
    release(i);
    return;
}

void release(int i)
{
    printf("site %d is leaving the critical section\n", i+1);
    token.ln[i] = s[i]->rn[i]; // to indicate CS request is executed
    for(int j = 0 ; j<N ; j++){
        if(s[i]->rn[j] == token.ln[j]+1 && !(in_queue(j)))
            enqueue(j);
    }
    if(*r != *f){
        int id = dequeue();
        printf("token is sent to %d\n",id+1);
        sleep(1);
        printf("site %d is entering critical section\n",id+1);
        release(id);
    } 
    else
        return;
}

bool in_queue(int i){
    for(int j = 0 ; j<N ; j++){
        if(token.q[j] == i)
            return true;
    }
    return false;
}

int dequeue()
{
    if(*f == -1){
        printf("queue empty\n");
        return NULL;
    }
    int temp = token.q[*f];
    *f = front + 1;
        if(*f > *r)
        *f = *r = -1;
    return temp;
}

void enqueue(int val)
{
    if(*r == N-1){
        printf("queue full\n");
    }
    if(*f == -1){
        *f = 0;
    }
    *r += + 1;
    token.q[*r] = val;
}