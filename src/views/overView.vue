<template>
	<div>
		<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
		<div class="my-nav ml-5 v-chip--clickable">
			<v-navigation-drawer
				:value="drawer"
				absolute
				temporary
				@input="(opened) => (!opened ? toggleDrawer() : null)"
				width="325"
			>
				<h2 class="navCityHacktitle">City Hack 2021</h2>

				<v-divider></v-divider>
				<ul>
					<li @click="$refs.fullpage.api.moveTo(1)">
						About CityHack
					</li>
					<li @click="$refs.fullpage.api.moveTo(2)">
						Rules & Judging Criteria
					</li>
					<li @click="$refs.fullpage.api.moveTo(3)">TimeLine</li>
					<li @click="$refs.fullpage.api.moveTo(4)">Prizes</li>
					<li @click="$refs.fullpage.api.moveTo(5)">Q&As</li>
					<li @click="$refs.fullpage.api.moveTo(6)">Judges</li>
					<li @click="$refs.fullpage.api.moveTo(7)">Sponsors</li>
				</ul>
				<!-- <v-list dense nav>
					<v-list-item v-for="item in items" :key="item.title" link>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list> -->
			</v-navigation-drawer>
		</div>
		<full-page :options="options" id="fullpage" ref="fullpage">
			<div id="aboutUs" class="section">
				<AboutUs />
			</div>
			<div id="rulesAndCriteria" class="section">
				<RulesAndCriteria />
			</div>
			<div id="timeLine" class="section">
				<TimeLine />
			</div>
			<div id="prizes" class="section">
				<Prizes />
			</div>
			<div id="QandA" class="section">
				<QandA />
			</div>
			<div id="judges" class="section">
				<Judges />
			</div>
			<div id="sponsors" class="section fp-auto-height-responsive">
				<Sponsors />
			</div>
		</full-page>
	</div>
</template>

<script>
	import AboutUs from '../components/landingPage/aboutUs';
	import TimeLine from '../components/landingPage/timeLine';
	import Judges from '../components/landingPage/judges';
	import Prizes from '../components/landingPage/prizes';
	import RulesAndCriteria from '../components/landingPage/rulesAndCriteria';
	import Sponsors from '../components/landingPage/sponsors';
	import QandA from '../components/landingPage/QandA';
	import { mapGetters, mapMutations } from 'vuex';

	export default {
		name: 'overView',
		components: {
			AboutUs,
			TimeLine,
			Judges,
			Prizes,
			RulesAndCriteria,
			Sponsors,
			QandA,
		},
		computed: {
			// eslint-disable-next-line no-mixed-spaces-and-tabs
			...mapGetters('menu', ['drawer']),
		},
		data() {
			return {
				options: {
					licenseKey: 'YOUR_KEY_HEERE',
					menu: '#menu',
					autoScrolling: true,
					fitToSection: true,
				},
				items: [
					{ title: 'About CityHack', icon: 'mdi-view-dashboard' },
					{ title: 'About', icon: 'mdi-forum' },
				],
			};
		},
		methods: {
			...mapMutations('menu', ['toggleDrawer']),
		},
	};
</script>

<style lang="scss" scoped>
	.active {
		color: #ebad00;
	}

	ul {
		display: flex;
		position: fixed;
		flex-direction: column;
		align-items: start;
		list-style-type: none;
		// z-index: 100;
		padding-left: 20px;
		li {
			padding: 6px 0;

			position: relative;
			display: block;
			font-size: larger;
			padding: 4px 0;
			font-family: Lato, sans-serif;
			color: #000000;
			text-decoration: none;
			text-transform: uppercase;
			transition: 0.5s;

			&::after {
				position: absolute;
				content: '';
				top: 100%;
				left: 0;
				width: 100%;
				height: 3px;
				background: #e74d08;
				transform: scaleX(0);
				transform-origin: right;
				transition: transform 0.5s;
			}

			&:hover {
				color: #e74d08;
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
