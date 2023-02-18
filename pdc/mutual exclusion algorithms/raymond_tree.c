#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#define N 8

// defining structures
struct node
{
    int req[N];
    int front, rear;
    int holder;
};

struct node n1, n2, n3, n4, n5, n6, n7, n8;
struct node *arr[] = {&n1, &n2, &n3, &n4, &n5, &n6, &n7, &n8};

void initialise_nodes();
void request(int);
void release(int);
void dequeue(struct node *);
void enqueue(struct node *, int);

int main()
{
    initialise_nodes();

    // creating tree
    n1.holder = 1;
    n2.holder = 3;
    n3.holder = 3;
    n4.holder = 4;
    n5.holder = -1;
    n6.holder = 4;
    n7.holder = 5;
    n8.holder = 5;
    enqueue(arr[0], 0);
    request(0);
    enqueue(arr[7],7);
    request(7);
    return 0;
}

void initialise_nodes()
{
    for (int i = 0; i < N; i++)
    {
        arr[i]->front = -1;
        arr[i]->rear = -1;
    }
    return;
}

void request(int i)
{
    while (arr[i]->holder != -1)
    {
        int temp = i;
        i = arr[i]->holder;
        enqueue(arr[i], temp);
    }
    // now arr[i] is the node which has the token
    release(i);
    return;
}

void release(int i)
{
    int temp = 0;
    while (arr[i]->req[arr[i]->front] != i)
    {
        int top = arr[i]->req[arr[i]->front]; // top element in current site's req queue
        printf("token is being sent to site %d from site %d\n", top + 1, i + 1);
        sleep(1);
        arr[i]->holder = top;
        arr[top]->holder = -1;
        dequeue(arr[i]);
        i = top;
        temp++;
    }
    // now the token is with the site that wants to execute process
    printf("\nsite %d is entering critical section\n\n", i + 1);
    sleep(2.5);
    dequeue(arr[i]);
    if (arr[i]->front != -1)
    {
        request(arr[i]->req[arr[i]->front]);
        return;
    }
    return;
}

void dequeue(struct node *n)
{
    if (n->front == -1)
    {
        printf("queue empty\n");
        return;
    }
    n->front += 1;
    if (n->front >= n->rear){
        n->front = -1;
        n->rear = -1;
    }
    return;
}

void enqueue(struct node *n, int val)
{
    if (n->rear == N - 1)
    {
        printf("queue full\n");
        return;
    }
    if (n->front == -1)
    {
        n->front = 0;
    }
    n->rear += 1;
    n->req[n->rear] = val;
    return;
}
