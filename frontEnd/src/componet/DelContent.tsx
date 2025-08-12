import axios from "axios";
import { Button } from "./Button";
import DeleteIcon from "./DeleteIcon";
const Backend_url="http://second-brain-tj7m.onrender.com/";


export function DelContent({ _id }: { _id: string }) {
    async function handleDelete() {
        await axios.delete(`${Backend_url}/api/v1/content`, {
            data: { contentId: _id },
            headers: { "Authorization": localStorage.getItem("token") }
        });
    }

    return (
        <Button variant="none" onClick={handleDelete} startIcon={<DeleteIcon />} text="Delete" />
    );
}