#include <iostream>
#include <vector>
#include <windows.h>
#include <cstdlib>
#include <time.h>

using namespace std;

struct Node
{
    int id;
    bool coordinator;
    bool election_broadcast;
    vector<int> response;
    Node(int id)
    {
        this->id = id;
        coordinator = false;
        election_broadcast = false;
    }
};

class bully_algorithm
{
private:
    int totalNodes;

public:
    vector<Node> node_vector;
    void init(int total)
    {
        this->totalNodes = total;
        cout << "number of processes: " << total << endl;
        node_vector.reserve(totalNodes);
        for (int i = 0; i < node_vector.capacity(); i++)
        {
            node_vector.emplace_back(i);
        }
    }
    void election(int id)
    {
        for (int i = id + 1; i < totalNodes; i++)
        {
            if (node_vector[i].election_broadcast == false)
            {
                node_vector[i].election_broadcast = true;
                printf("election request %d ----------> %d\n", id, i);
                Sleep(800);
            }
            if (i != totalNodes - 1)
            {
                printf("OK %d ----------> %d\n", i, id);
                node_vector[id].response.emplace_back(i);
            }
            election(i);
        }
    }
};

int main()
{
    srand(time(0));
    int num_nodes;
    cin >> num_nodes;
    bully_algorithm object;
    object.init(num_nodes);
    printf("node 0 realises node %d has failed and starts election\n", num_nodes - 1);
    object.election(0);
    for (int i = 0; i < num_nodes; i++)
    {
        if (object.node_vector[i].response.empty())
        {
            printf("node %d is now the coordinator", i);
            break;
        }
    }
    return 0;
}
