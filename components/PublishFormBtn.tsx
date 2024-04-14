import { Button } from "./ui/button"
import { MdOutlinePublish } from "react-icons/md"

function PreviewDialogBtn() {
    return (
        <Button className="gap-2 text-white bg-gradient-to-t from-indigo-400 to-cyan-400 " variant={"outline"} >
            <MdOutlinePublish className="size-4" />
            Publish
        </Button>
    )
}

export default PreviewDialogBtn