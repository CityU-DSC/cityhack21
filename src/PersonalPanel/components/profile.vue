<template>
  <div>
    <nav-drawer @direct="directTo" :current="pathName"/>
    <div class="content">
      <div class="row">
        <div class="col-md-8 order-2">
          <div class="card">
            <!---->
            <div class="card-header"><h5 class="title">Edit Profile</h5></div>
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col-md-5">
                    <div class="form-group has-label">
                      <label> Team Name </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          disabled="disabled"
                          placeholder="Team Name"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group has-label">
                      <label> Profile Name </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          placeholder="Profile Name"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group has-label">
                      <label> Email Address </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="email"
                          placeholder="email"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group has-label">
                      <label> First Name </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          placeholder="First Name"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group has-label">
                      <label> Last Name </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          placeholder="Last Name"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group has-label">
                      <label> Address </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          placeholder="Home Address"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group has-label">
                      <label> City </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          placeholder="City"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group has-label">
                      <label> Country </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          type="text"
                          placeholder="Country"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group has-label">
                      <label> Postal Code </label>
                      <div class="mb-0">
                        <!----><input
                          aria-describedby="addon-right addon-left"
                          placeholder="ZIP Code"
                          class="form-control"
                        /><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group has-label">
                      <grammarly-extension
                        style="
                          position: absolute;
                          top: 0px;
                          left: 0px;
                          pointer-events: none;
                        "
                        class="cGcvT"
                      ></grammarly-extension
                      ><label> About Me </label>
                      <div class="mb-0">
                        <!----><textarea
                          placeholder="ZIP Code"
                          class="form-control"
                          spellcheck="false"
                        ></textarea
                        ><!---->
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
                <button
                  data-v-01e1f50f=""
                  type="submit"
                  class="btn btn-fill btn-primary"
                >
                  <!---->
                  Save
                </button>
              </form>
            </div>
            <!----><!---->
          </div>
        </div>
        <div class="col-md-4 order-1">
          <div class="card card-user">
            <!----><!---->
            <div class="card-body">
              <p class="card-text"></p>
              <div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <a href="javascript:void(0)"
                  ><img src="https://randomuser.me/api/portraits/men/1.jpg" alt="..." class="avatar" />
                  <h5 class="title">Firstname Lastname</h5></a
                >
                <p class="description">Team X: Team Name</p>
              </div>
              <p></p>
              <div class="card-description">
                personal description...
              </div>
            </div>
            <!---->
            <div class="card-footer">
              <!---->
              <div class="button-container">
                <button
                  data-v-01e1f50f=""
                  type="button"
                  class="btn btn-facebook btn-round btn-icon btn-fab btn-default"
                >
                  <!----><i
                    data-v-01e1f50f=""
                    class="fab fa-facebook"
                  ></i></button
                ><button
                  data-v-01e1f50f=""
                  type="button"
                  class="btn btn-twitter btn-round btn-icon btn-fab btn-default"
                >
                  <!----><i data-v-01e1f50f="" class="fab fa-twitter"></i></button
                ><button
                  data-v-01e1f50f=""
                  type="button"
                  class="btn btn-google btn-round btn-icon btn-fab btn-default"
                >
                  <!----><i data-v-01e1f50f="" class="fab fa-google-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "personal_profile",
  components: {
    navDrawer,
  },
  data() {
    return {
      pathName: "Profile Page",
    };
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
  },
};
</script>

<style scoped>
/* .my-nav ml-5 v-chip--clickable {
  flex-direction: column;
  align-items: start;
  list-style-type: none;
} */
.content {
  padding-left: 70px;
  /* flex-direction: column-reverse; */
}

</style>
