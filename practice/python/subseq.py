string = "aabcsd"
out = list(string)
l = len(string)
ptr = ""
for i in range(1, l):
    for j in range(l-i):
        sub = string[j:i+j]
        for k in range(j+i, l):
            out.append(sub+string[k])
print(out)
