for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        if (j % 3 === 0) process.stdout.write("█")
        else process.stdout.write("*")
    }
    process.stdout.write("\n")
}

// console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }])