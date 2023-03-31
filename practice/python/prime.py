# Given a number n, print all primes smaller than or equal to n. It is also given that n is a small number.
# For example, if n is 10, the output should be “2, 3, 5, 7”. If n is 20, the output should be “2, 3, 5, 7, 11, 13, 17, 19”.
# Input Format

# Integer N
# Constraints

# no
# Output Format

# Print all primes smaller than or equal to n.
# Sample Input 0

# 30

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
print(" ".join(map(str, arr)))
