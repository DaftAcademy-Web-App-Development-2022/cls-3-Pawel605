import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";
import { playlistMapper } from "~/pages/api/playlist/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const playlists = await getPlaylists()
    res.status(200).send({ data: playlists });
  }
  else if (req.method === "POST") {
    const result = await createPlaylist(req.body);
    const createdPlaylist = playlistMapper(result);
    res.status(201).send({ data: createdPlaylist });
  }
}

async function getPlaylists() {
  const playlists = await Playlist.find();
  return playlists.map((doc) => {
    return playlistMapper(doc.toObject());
  });
}

async function createPlaylist(obj: unknown) {
  return await Playlist.create(obj);
}
