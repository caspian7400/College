# Given a number n, write an efficient function to print all prime factors of n. For example, if the input number is 12, then the output should be “2 2 3”. And if the input number is 315, then the output should be “3 3 5 7”.

# Input Format

# Integer N

# Constraints

# No

# Output Format

# Prime factors of that integer

# Sample Input 0

# 12

def is_prime(n):
    for i in range(2, n):
        if (n % i == 0):
            return (n, False)
    return (n, True)


n = int(input())
arr = []
for i in range(2, n+1):
    value, prime = is_prime(i)
    if (prime == True):
        arr.append(value)

out = []
def fun(n,arr):
    for element in arr:
        while(n%element == 0):
            n = n / element
            out.append(int(element))
    return

fun(n,arr)
print(" ".join(list(map(str,out))))