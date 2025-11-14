import { Gender } from "@prisma/client";
import { useState } from "react";
import { useCreateDoctor } from "@/hooks/use-doctors";
import { Dialog, DialogFooter, DialogHeader,DialogContent,DialogDescription, DialogTitle } from "@/ui/dialog";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Select } from "@/ui/select";
import { format } from "path";
import { formatPhoneNumber } from "@/lib/utils";




interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
} 

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    gender: 'MALE' as Gender,
    isActive: true,
  });


  const createDoctorMutation =useCreateDoctor();

  const handlePhoneChange = (phone: string) => {
    const formattedPhoneNumber = formatPhoneNumber(phone)
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleSave = () => {
    createDoctorMutation.mutate(newDoctor, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error: any) => {
        alert(error.message || "Failed to add doctor");
      }
    });
  }

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      gender: 'MALE',
      isActive: true,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {/* Dialog content goes here */}
         <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>Add a new doctor to your practice.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                placeholder="Dr. John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor.specialty}
                onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                placeholder="General Dentistry"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-email">Email *</Label>
            <Input
              id="new-email"
              type="email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              placeholder="doctor@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-phone">Phone</Label>
            <Input
              id="new-phone"
              value={newDoctor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(254) 123-4567"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value: any) => setNewDoctor({ ...newDoctor, gender: value as Gender })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value: any) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.specialty ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default AddDoctorDialog;