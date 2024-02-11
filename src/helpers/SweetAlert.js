import Swal from 'sweetalert2';

export const showSuccessSwal = ({ title = 'Your work has been saved', timer = 1500 }) => {
    const icon = title.includes("Error") ? "error" : "success";
    Swal.fire({
      position: "top-end",
      icon,
      title,
      timer,
      showConfirmButton: false,
    });

}
