export function playlistMapper(playlist: any) {
  return {
    name: playlist.name,
    owner: playlist.owner,
    slug: playlist.slug,
    spotifyId: playlist.spotifyId,
    upvote: playlist.upvote,
    color: playlist.color,
    id: playlist._id.toString(),
  };
}
