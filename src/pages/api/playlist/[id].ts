import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/libraries/mongoose.library";
import { Playlist } from "~/models/Playlist.model";
import { playlistMapper } from "~/pages/api/playlist/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "GET") {
      const playlist = await getPlaylist(id as string);
      res.status(200).send({ data: playlist });
    } else if (req.method === "DELETE") {
      await deletePlaylist(id as string);
      res.status(200).send({data: null});
    }
}

async function getPlaylist(id: string) {
  const result = await Playlist.findById(id);
  if (!result) return null;
  return playlistMapper(result.toObject());
}

async function deletePlaylist(id: string) {
  await Playlist.findByIdAndDelete(id);
}
