import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
interface EditModelProps {
  id: string; 
  defaultValue: string

}

export default function EditModel(
  { id,defaultValue }: EditModelProps,
) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>(defaultValue);
  //taking changes from textarea
  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };
  //function
  const handleOnSubmit = async () => {
    try {
      const response = await axios.put(`/api/category/update-category/${id}`, {
        categoryName: name,
      });
      if (!response) {
        toast({
          title: "Failed",
          description: "Failed to create category",
          duration: 3000,
          variant: "destructive",
        });
        console.log("Failed to create category");
        return;
      }
      toast({
        title: "Updated",
        description: "Category updated successfully",
        duration: 3000,
      });
      console.log("Category created successfully", response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error updating category",
        duration: 3000,
        variant: "destructive",
      });
      console.error("Error creating category", error);
    } finally {
      setName("");
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Edit your Category</DialogTitle>
          <DialogDescription className="text-black">
            Make changes to your Category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit}>
          <div className="grid w-full gap-2">
            <Textarea
              required
              value={name}
              onChange={handleNameChange}
              className=" resize-none"
              placeholder="Type your category here."
            />
            <Button disabled={loading ? true : false} type="submit">
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
