<style>
@media (max-width: 992px) {
 .title {
   margin-top: 70px;
 }
}

</style>
<body class="login-page sidebar-collapse">
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image:url(/resepmu/application/assets/img/login.JPG)"></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <div class="card card-login card-plain">
            <form class="form" method="post" action="">
              <div class="card-header text-center">
                  <h1 class="title">
                    <a>Login</a>
                  </h1>
              </div>

              <div id="infoMessage"><?php echo $this->session->flashdata('message');?></div>
              <div class="card-body">
                <div class="input-group no-border input-lg">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-user-circle"></i>
                    </span>
                  </div>
                  <input type="text" class="form-control" name="username" placeholder="Masukkan Username" required />
                </div>
                <div class="input-group no-border input-lg">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                  <input type="password" placeholder="Masukkan Password" name="password" class="form-control" required />
                </div>
              </div>
              <div class="card-footer text-center">
                <button type="submit" name="submit" class="btn btn-primary btn-round btn-lg btn-block">Masuk</button>
                <div class="text-center">
                  <h6>
                    <a href="<?php echo base_url('user/registrasi');?>" class="link">Daftar</a>
                  </h6>
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Data tidak boleh kosong");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})

</script>
