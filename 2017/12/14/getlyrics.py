# PyLyrics is a python module to get Lyrics of songs from lyrics.wikia.com
# It has support for getting albums of a singer and songs from an album from which lyrics can be accessed
from PyLyrics import *

# Read in the file that has a list of artists Romero liked
artists = open(sys.argv[4], 'r')

# This is the output file using the argument from the command line
# All the lyrics will be written to this file, and is later
# used as a list of passwords to test against the encypted file password
lyrics = open(sys.argv[6], 'w')

# For every artist, get a list of tracks and download the lyrics
for artist in artists:
  albums = PyLyrics.getAlbums(singer=artist)

  # Loop through every album and get the tracks
  for album in albums:
    tracks = album.tracks()
    for track in tracks:
      lyrics.write(track.getLyrics())

artists.close()
lyrics.close()