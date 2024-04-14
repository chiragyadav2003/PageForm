import { Button } from "./ui/button"
import { HiSaveAs } from "react-icons/hi"

function PreviewDialogBtn() {
    return (
        <Button className="gap-2" variant={"outline"} >
            <HiSaveAs className="size-4" />
            Save
        </Button>
    )
}

export default PreviewDialogBtn