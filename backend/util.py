
def latexify(string):
    a=0
    final=''
    lists=[]
    first=True
    string=list(string)
    for i in range(len(string)):

        if string[i]=='$':
            lists.append(string[a:i])
            a=i

    lists.append(string[a:len(string)])
    for i in range(len(lists)):
        if i==0:

            final+="".join(lists[i])
        elif first:
            final += '\\('
            first= not first
            final+=''.join(lists[i][1:])
        elif not first:
            final += '\\)'
            first = not first
            final += ''.join(lists[i][1:])

    return final

