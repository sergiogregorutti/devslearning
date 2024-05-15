import { TextField } from "@mui/material";

export default async function Page() {
  return (
    <>
      <h1>Technologies</h1>
      <h2>Create</h2>
      <form>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" name="name" className="form-input" />
        <TextField fullWidth type="email" className="form-input" />
      </form>
    </>
  );
}
