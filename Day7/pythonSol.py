with open('DirectoriesTree.txt') as commandfile:
    commands = commandfile.readlines()

    tree ={'start':0}
    current = 'start'
    path=['start']
    folders = ['start']

    for command in commands:
        com = command.strip().split(" ")

        if com[1] == 'cd':
            if com[2] == '/':
                path=['start']
                current='start'
            elif com[2]=='..':
                path.pop()
                current=path[-1]
            else:
                current += com[2]
                path.append(current)

        if com[0]=='dir':
            word = current+com[1]
            tree[word]=0
            folders.append(word)
        if com[0].isdigit():
            for key in path:
                tree[key] += int(com[0])

values = []
sum = 0
for folder in folders:
    values.append(tree[folder])
    if tree[folder] < 100000:
        sum += tree[folder]
        
space_to_clean = tree['start'] - 40000000 
minimum_folder_to_remove = 0
ordered_values = sorted(values)

for n in ordered_values:
    if n > space_to_clean:
        minimum_folder_to_remove += n
        break
    
print(sum, minimum_folder_to_remove)