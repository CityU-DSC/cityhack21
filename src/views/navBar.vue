<template>
	<div class="navigation">
		<v-container>
			<v-row class="iconLink mt-md-3 mb-md-3 mx-0 mb-2 mt-2">
				<v-col class="d-flex p-0">
					<v-icon class="mr-2">
						mdi-instagram
					</v-icon>
					<v-icon class="mr-2">
						mdi-facebook
					</v-icon>
					<v-icon class=" mr-auto">
						mdi-twitter
					</v-icon>
					<a
						href="https://cityu-dsc.github.io/dsc-web/"
						target="_blank"
						class="mr-md-2 mr-1"
					>
						<v-chip pill dark class="v-chip--clickable">
							CityU DSC
						</v-chip>
					</a>
					<a href="https://cityu-hall2.github.io/" target="_blank">
						<v-chip pill dark class="v-chip--clickable">
							Hall2 IT Team
						</v-chip>
					</a>
				</v-col>
			</v-row>
		</v-container>
		<div class="title"><router-link to="/">#CityHack 2021</router-link></div>
		<b-nav align="center">
			<b-nav-item>
				<v-app-bar-nav-icon @click.stop="$Store.mutations.toogleDrawer"></v-app-bar-nav-icon>
				<!-- {{ drawer }} -->
			</b-nav-item>
			<b-nav-item active>
				<router-link to="/overview">Overview</router-link>
			</b-nav-item>
			<b-nav-item>Resources</b-nav-item>
			<b-nav-item>Log In</b-nav-item>
		</b-nav>
	</div>
</template>

<script>
	// import { mapGetters } from 'vuex';
	export default {
		name: 'navBar',
		// computed: {
		// 	...mapGetters(['drawer']),
    // },
    mounted: () =>{
      // console.log($refs)
    }
	};
</script>

<style scoped>
	a {
		text-decoration: none;
		color: black;
	}

	.iconLink {
		/* margin: 1rem 0 2rem 0; */
	}

	.navigation {
		/* height: 20vh; */
		text-align: center;
	}

	.title {
		font-size: 40px;
		font-weight: bold;
	}
</style>
