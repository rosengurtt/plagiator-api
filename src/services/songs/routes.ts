import { Request, Response } from "express";
import { getAllSongsForStyle, getAllSongs, 
    getAllSongsForBand, getSongById,getSongMidiById } from "./songController";


export default [
    {
        path: "/api/songs",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                if (req.query.styleId) {
                    const result = await getAllSongsForStyle(req.query.styleId);
                    res.status(200).send(result);
                } else if (req.query.bandId) {
                    const result = await getAllSongsForBand(req.query.bandId);
                    res.status(200).send(result);
                } else {
                    const result = await getAllSongs();
                    res.status(200).send(result);
                }
            }
        ]
    },
    {
        path: "/api/songs/:songId",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const result = await getSongById(req.params.songId);
                res.status(200).send(result);
            }
        ]
    },
    {
        path: "/api/songs/midi/:songId",
        method: "get",
        handler: [
            async (req: Request, res: Response) => {
                const myMidiSong = await getSongMidiById(req.params.songId);
                res.writeHead(200, {
                    'Content-Type': 'audio/midi'
                });
                res.end(myMidiSong, 'binary');
            }
        ]
    }
];