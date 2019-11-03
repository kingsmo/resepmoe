<style>
@media (max-width: 992px) {
 .title {
   font-size: 18px;
 }
 .card {
   width: 8rem !important;
   height: 15rem !important;
   font-size: 8px;
 }
 .card-body{
   font-size: 7px;
 }
 .card-title{
   height: 36px;
  }
  .category{
    height:0px;
  }
 .footer{
   margin-top: 260px;
 }
}

@media (min-width: 992px) {
  .card {
    width: 15rem;
    height: 22rem;
    font-size: 12px;
  }
  .card-title{
    height: 73px;
  }
  .category{
     height:0px;
  }
}

</style>

<body class="sidebar-collapse">
<div class="wrapper">
<div class="section section-about-us" style="padding:20px;">
  <div class="container">

    <div class="row" style="padding-top:40px;">


      <div class="text-center col-md-12">
        <h1 class="title" style="color:#2c2c2c;">Pencarian</h1>
      </div>
      <div class="col-md-12">
        <h6>Hasil Pencarian: <?php echo $this->input->post('cari')?></b></h6>
      </div>
      <div class="col-md-12">
        <h5 class="title" style="color:#2c2c2c;">Nama Resep</h5>
      </div>
      <?php
        if (empty($user)) {
          echo  "<p style='padding-left:20px;'>Data tidak ditemukan</p>";
        }
        else if($user[0]["id_resep"]==null){
          echo  "<p style='padding-left:20px;'>Data tidak ditemukan</p>";
        }else{

      foreach($user as $h){ ?>
      <div class="col-md-3 col-6 text-center">
        <div class="card">
          <img class="card-img-top" style="height:50%;" src="/resepmu/application/assets/img/resep/<?=$h["resep_foto"]?>" alt="Card image cap">
          <div class="card-body" style="padding-top: 0px;">
            <h5 class="card-title" style="margin-top: 10px;"><?php echo $h["nama_resep"]?></h5>
            <a href="<?php echo base_url('/user/profile/'.$h["username"].'/'.$h["id_user"])?>"><p class="category text-primary" ><?php echo $h["nama"]?></p></a><br>
            <a href="<?php echo base_url('/resep/halaman_resep/'.$h["id_resep"])?>" class="btn btn-primary" style="margin-top: 0px;">Lihat</a>
          </div>
        </div>
      </div>
      <?php  } } ?>
    </div>

    <div class="row" style="padding-top:30px;">
      <div class="col-md-12">
        <h5 class="title" style="color:#2c2c2c;">User</h5>
      </div>
      <?php
        if (empty($user)) {
                echo  "<p style='padding-left:20px;'>Data tidak ditemukan</p>";
        }else{ ?>
      <div class="col-3 text-center">
        <div class="card">
          <img class="card-img-top" style="height:50%;" src="/resepmu/application/assets/img/user/<?=$user[0]["user_foto"]?>" alt="Card image cap">
          <div class="card-body" style="padding-top: 0px;">
            <h5 class="card-title" style="margin-top: 10px;"><?php echo $user[0]["username"]?></h5>
            <p class="category text-primary" ><?php echo $user[0]["nama"]?></p><br>
            <a href="<?php echo base_url('/user/profile/'.$user[0]["username"].'/'.$user[0]["id_user"])?>" class="btn btn-primary" style="margin-top: 0px;">Lihat</a>
          </div>
        </div>
      </div>
      <?php  } ?>
    </div>
    <!-- <div class="row justify-content-center" style="padding-top:30px;">
      echo $halaman;?>
    </div> -->
  </div>
</div>
</div>
