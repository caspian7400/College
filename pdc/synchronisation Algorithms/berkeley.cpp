#include <iostream>
#include <windows.h>
#include <cstdlib>
#include <vector>
#include <time.h>

using namespace std;

struct node
{
    int id;
    int master;
    float time;
    node(int id)
    {
        this->id = id;
        master = false;
        time = rand() % 21 + 900;
    }
};

class berkeley
{
private:
    vector<node> node_vector;
    int total_nodes;
    int master_idx;

public:
    void init(int total)
    {
        cout << "total number of nodes: " << total << endl;
        this->total_nodes = total;
        node_vector.reserve(total_nodes);
        for (int i = 0; i < node_vector.capacity(); i++)
        {
            node_vector.emplace_back(i);
        }
        master_idx = rand() % total_nodes;
        node_vector[master_idx].master = true;
        cout << "node " << master_idx << " is the master\n";
    }

    void algorithm()
    {
        float avg = 0.0;
        for (int i = 0; i < node_vector.capacity(); i++)
        {
            avg += node_vector[i].time / (float)total_nodes;
            if (i == master_idx)
                continue;
            cout << "node " << master_idx << " sends request to node " << i << endl;
            Sleep(800);
        }
        float err;
        for (int i = 0; i < node_vector.capacity(); i++)
        {
            err = avg - node_vector[i].time;
            cout << "node " << i << " has error of " << err << endl;
            node_vector[i].time = avg;
            Sleep(800);
        }
        cout << "the synchronised time is " << avg << endl;
    }
};

int main()
{
    srand(time(0));
    berkeley object;
    object.init(5);
    object.algorithm();
    return 0;
}