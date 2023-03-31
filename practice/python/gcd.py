# Given an array of numbers, find GCD of the array elements

# Input Format

# First Line array size
# Second Line array elements
# Constraints

# No
# Output Format

# GCD of elements of array

# sample input
# 5
# 2 4 6 8 16

n = int(input())
l1 = list(map(int, input().split(" ")))
gcd = 1
flag = 0
for i in range(1, min(l1)+1):
    for element in l1:
        if (element % i == 0):
            flag = 1
        else:
            flag = 0
    if (flag == 1):
        gcd = i

print(gcd)
