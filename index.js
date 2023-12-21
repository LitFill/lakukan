import fs from "fs";
import readline from "readline";

const tampilkanTasks = () => {
    fs.open("todo.txt", "a", (err) => {
        if (err) throw err;
        fs.readFile("todo.txt", "utf8", (err, data) => {
            if (err) throw err;
            const tasks = data.split("\n");
            console.log("lakukan:");
            tasks.forEach((task, index) => {
                if (task !== "") {
                    console.log(`${index + 1}. ${task}`);
                }
            });
        });
    });
};

const tambahTasks = (task) => {
    fs.appendFile("todo.txt", task + "\n", (err) => {
        if (err) throw err;
        console.log("INFO: Data ditambahkan.");
    });
};

const hapusTasks = (nomorTask) => {
    fs.readFile("todo.txt", "utf8", (err, data) => {
        if (err) throw err;
        const dataArray = data.split("\n");
        if (nomorTask > dataArray.length) {
            console.log("ERROR: Nomor task tidak valid.");
            tampilkanTasks();
            return;
        }
        dataArray.splice(nomorTask - 1, 1);
        const dataString = dataArray.join("\n");
        fs.writeFile("todo.txt", dataString, (err) => {
            if (err) throw err;
            console.log("INFO: Data dihapus.");
        });
    });
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

tampilkanTasks();

rl.on("line", (input) => {
    const args = input.trim().split(" ");
    switch (args[0]) {
        case "tampilkan":
            tampilkanTasks();
            break;
        case "tambah":
            const task = args.slice(1).join(" ");
            tambahTasks(task);
            break;
        case "hapus":
            const nomorTask = parseInt(args[1]);
            hapusTasks(nomorTask);
            break;
        default:
            console.log("Perintah tidak dikenali");
    }
});

rl.on("SIGINT", () => {
    console.log("INFO: Program ditutup.");
    process.exit(0);
});

rl.on("close", () => {
    console.log("INFO: Program ditutup.");
    process.exit(0);
});
