<template>
	<div>
		<div class="my-nav ml-5 v-chip--clickable" v-if="currentUser">
			<v-card>
				<v-navigation-drawer permanent expand-on-hover app width="325">
					<v-list>
						<v-list-item class="px-1">
							<v-list-item-avatar>
								<v-img :src="currentUser.avatarUrl"></v-img>
							</v-list-item-avatar>
						</v-list-item>

						<v-list-item link>
							<v-list-item-content>
								<v-list-item-title class="title">
									{{ currentUser.nickName }}
								</v-list-item-title>
								<v-list-item-subtitle>{{
									currentUser.email
								}}</v-list-item-subtitle>
								<v-list-item-subtitle class="mt-3">
									<v-row class="ml-1">
										<v-btn
											rounded
											class="mr-3"
											outlined
											@click="goToLandingPage"
											>Landing Page</v-btn
										>
										<v-btn rounded outlined @click="logout">LOGOUT</v-btn>
									</v-row>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-tooltip right>
							<template v-slot:activator="{ on, attrs }">
								<v-list-item @click="copyAccountId" v-bind="attrs" v-on="on">
									<v-list-item-subtitle>
										Account id:
										<span style="text-transform: none;">{{
											currentUser.accountId
										}}</span>
									</v-list-item-subtitle></v-list-item
								>
							</template>
							<span>Copy</span>
						</v-tooltip>
					</v-list>

					<v-divider class="mt-5 mb-5"></v-divider>
					<v-list>
						<v-list-item
							v-for="item in menu"
							:key="item.id"
							@click="navigateTo(item.page)"
						>
							<v-list-item-icon>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-item-icon>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-navigation-drawer>
			</v-card>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex';

	export default {
		name: 'navDrawer',
		props: {
			pathName: String,
		},
		computed: {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
			...mapGetters('auth', ['currentUser']),
			...mapGetters('menu', ['drawer']),
		},
		data() {
			return {
				menu: [
					{ id: 1, title: 'Home Page', icon: 'mdi-home', page: '/personal' },
					{
						id: 2,
						title: 'Profile Page',
						icon: 'mdi-account',
						page: '/personal/profile',
					},
					{
						id: 3,
						title: 'AWS Educate Verification',
						icon: 'mdi-aws',
						page: '/personal/verification',
					},
					{
						id: 4,
						title: 'Team Up',
						icon: 'mdi-account-group',
						page: '/personal/team',
					},
					{
						id: 5,
						title: 'Time Table',
						icon: 'mdi-calendar-clock',
						page: '/personal/timeSlot',
					},
					{
						id: 6,
						title: 'Submission',
						icon: 'mdi-upload',
						page: '/personal/submission',
					},
					{
						id: 7,
						title: 'Projects',
						icon: 'mdi-projector-screen',
						page: '/personal/projects',
					},
				],
			};
		},
		methods: {
			...mapMutations('menu', ['setDrawer']),
			...mapActions('auth', ['logOutUser']),
			navigateTo(page) {
				this.$emit('direct', page);
			},
			logout() {
				localStorage.removeItem('jwt');
				this.logOutUser();
				this.$router.push('/');
			},
			goToLandingPage() {
				this.$router.push('/');
			},
			copyAccountId() {
				const el = document.createElement('textarea');
				el.value = this.currentUser.accountId;
				el.setAttribute('readonly', '');
				el.style.position = 'absolute';
				el.style.left = '-9999px';
				document.body.appendChild(el);
				const selected =
					document.getSelection().rangeCount > 0
						? document.getSelection().getRangeAt(0)
						: false;
				el.select();
				document.execCommand('copy');
				document.body.removeChild(el);
				if (selected) {
					document.getSelection().removeAllRanges();
					document.getSelection().addRange(selected);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.active {
		color: #ff9900;
	}

	.v-list {
		flex-direction: column;
		align-items: start;
		list-style-type: none;

		.v-list-item {
			font-size: larger;
			color: #000000;
			text-decoration: none;
			text-transform: uppercase;
			transition: 0.5s;

			&::after {
				position: absolute;
				content: '';
				bottom: 0;
				left: 0;
				width: 100%;
				min-height: 3px;
				background: #ff9900;
				transform: scaleX(0);
				transform-origin: right;
				transition: transform 0.5s;
			}

			&:hover {
				color: #ff9900;
			}

			&:hover::after {
				transform: scaleX(1);
				transform-origin: left;
			}
		}
	}

	.navCityHacktitle {
		text-align: center;

		h2 {
			margin-bottom: 0;
		}

		margin-top: 20px;
	}
</style>
