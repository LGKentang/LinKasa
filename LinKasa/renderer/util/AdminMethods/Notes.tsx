import { Paper, Typography, Divider } from "@mui/material";

export const notes = [
  {
    header: " Chief Operations Officer - Flight Page",
    body: [
      " 1. kasih validasi biar source sama dest gbs sama",
      " 2. validasi biar date yang dipilih gbs sebelum hari ini",
      "3. jika dischedule, bikin state biar pesawatnya ga unused",
    ],
  },
  {
    header: " System",
    body: [
      " 1. bikin soft deletion",
      " 2. bikin shortcut ('C' for open chat ,...,...)",
      "3. bikin department chat",
      "4. Tray menu items"
    ],
  },
];

export const NotesMaker = (noteObjects: any[]) => {
  return noteObjects.map((note, index) => (
    <Paper key={index} sx={{ padding: "20px", margin: "10px" }}>
      <Typography
        variant="h6"
        sx={{ paddingBottom: "2px" }}
        style={{ fontFamily: "Montserrat", fontWeight: "600" }}
      >
        {note.header}
      </Typography>
      <Divider style={{ marginBottom: "10px" }} />
      {note.body.map((text, idx) => (
        <Typography key={idx}>
          {text}
          <br />
        </Typography>
      ))}
    </Paper>
  ));
};
