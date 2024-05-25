import Note from '../models/note.js'

export const fetchNotes = async (req, res) => {
    // find the notes
    const notes = await Note.find()

    // respond with notes
    res.json({ notes })
}

export const fetchNote = async (req, res) => {
    // get the id off the url
    const note_id = req.params.id

    //find the note using that id
    const note = await Note.findById(note_id)

    //respond with the note
    res.json({ note })
}

export const createNote = async (req, res) => {

    //get the sent in data off request body
    const { title, body } = req.body

    //create a note with it
    const note = await Note.create({
        title,
        body,
    })

    //respond with the new note
    res.json({ note })
}

export const updateNote = async (req, res) => {
    // get the id off the ur
    const note_id = req.params.id

    //get the note data (which has to be updated with) of the req body 
    const { title, body } = req.body

    // find and update the note
    await Note.findByIdAndUpdate(note_id, {
        title,
        body
    })

    // find updated one to respond back because findByIdAndUpdate() updates the note but responds with the prev one so had to fetch newly updated one to respond
    const note = await Note.findById(note_id)

    // respond with the updated note
    res.json({ note })
}

export const deleteNote = async (req, res) => {

    // get the id off the url
    const note_id = req.params.id

    // delete the note
    await Note.deleteOne({ _id: note_id })

    // respond
    res.json({ success: "Note Deleted" })

}