<?php
$title = $_POST['title'];
$description = $_POST['description'];
$file = $_FILES['file'];
$filename = $file['name'];
$filetype = $file['type'];
$filetmp = $file['tmp_name'];
$fileerror = $file['error'];

if ($fileerror === 0) {
   $filepath = 'uploads/' . $filename;
   if (move_uploaded_file($filetmp, $filepath)) {
      echo 'File uploaded successfully!';
   } else {
      echo 'Error uploading file.';
   }
} else {
   echo 'Error uploading file.';
}
?>