#include <iostream>
#include <windows.h>
#include <vector>
#include <cstdlib>
#include <time.h>

using namespace std;

struct Node
{
    int id;
    bool coordinator;
    vector<int> electionMessage;
    struct Node *next;
    Node(int id)
    {
        this->id = id;
        coordinator = false;
        this->next = NULL;
    }
};

class ringElection
{
public:
    int numNodes;
    int len = 0;
    struct Node *head = new Node(0);
    void init(int headID, int numNodes)
    {
        this->numNodes = numNodes;
        head->id = headID;
        head->coordinator = false;
        head->next = NULL;
        cout << "initialisation done\n";
        for (int i = 1; i < numNodes; i++)
            insert(i);
        struct Node *temp = head;
        while (temp->id != numNodes - 1)
        {
            temp = temp->next;
        }
        temp->coordinator = true;
    }
    void insert(int value)
    {
        struct Node *newNode = new Node(value);
        if (len == 0)
        {
            head->next = newNode;
            newNode->next = head;
            len++;
        }
        struct Node *temp = head;
        while (temp->next != head)
        {
            temp = temp->next;
            continue;
        }
        temp->next = newNode;
        newNode->next = head;
        len++;
    }

    void election(int id)
    {
        cout << "node " << id << " started election\n";
        Sleep(500);
        struct Node *temp1 = head;
        struct Node *temp2 = head;
        while (temp1->id != id)
        {
            temp1 = temp1->next;
            temp2 = temp2->next;
        }
        cout << "node " << temp1->id << " election message array :\n";
        for (int i = 0; i < numNodes; i++)
        {
            if (temp2->id == numNodes - 1){
                temp2 = temp2->next;
                continue;
            }
            temp1->electionMessage.emplace_back(temp2->id);
            temp2 = temp2->next;
            cout << temp2->id << "\t";
            Sleep(1000);
        }
        cout << endl;
        int max = temp1->electionMessage[0];
        for (int i = 0; i < temp1->electionMessage.size(); i++)
        {
            int loc = temp1->electionMessage[i];
            if (max < loc)
                max = loc;
        }
        cout << "\nnode " << temp1->id << " transmits : 'node " << max << " is now the coordinator'\n\n\n";
        while (temp1->id != max)
        {
            temp1 = temp1->next;
        }
        temp1->coordinator = true;
    }

    void print()
    {
        struct Node *temp = head;
        int count = 0;
        while (count < numNodes)
        {
            cout << "NODE " << temp->id << "\ndata : " << temp->id << "\ncoordinator : " << temp->coordinator << endl;
            cout << "\n\n";
            temp = temp->next;
            count++;
            Sleep(500);
        }
    }

    void fail()
    {
        struct Node *temp = head;
        while (temp->id != numNodes - 1)
            temp = temp->next;
        temp->coordinator = false;
    }
};

int main()
{
    ringElection object;
    int numNodes;
    cin >> numNodes;
    object.init(0, numNodes);
    object.fail();
    object.election(3);
    object.election(6);
    object.print();
    return 0;
}