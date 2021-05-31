const fs = require('fs');
const chalk = require('chalk');

const log = {
    red: msg => console.log(chalk.red(msg)),
    green: msg => console.log(chalk.green(msg)),
    blue: msg => console.log(chalk.blue(msg))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        log.red(e);
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const listNotes = () => {
    const notes = loadNotes();
    log.blue('Your notes:');
    notes.forEach((note, i) => console.log(`[${i}] ${note.title}`));
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({ title, body });
        saveNotes(notes);
        log.green('New note added!');
    } else {
        log.red(`Note title "${title}" is taken!`);
    }
}

const removeNote = title => {
    console.log('Note to be removed: ' + title);
    const notes = loadNotes();

    const notesToKeep = notes.filter(note => note.title !== title);

    if (notesToKeep.length !== notes.length) {
        saveNotes(notesToKeep);
        log.green(`Note "${title}" removed!`);
    } else {
       log.red(`Note "${title}" not found!`);
    }
}

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        log.blue(note.title);
        console.log(note.body);
    } else {
        log.red(`Note "${title}" not found!`);
    }
}



module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};