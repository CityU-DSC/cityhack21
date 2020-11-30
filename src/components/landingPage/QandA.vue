<template>
	<v-container>
		<v-toolbar flat class="mb-5">
			<v-toolbar-title>Q&A</v-toolbar-title>
			<v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="isOverView" v-bind="attrs" v-on="on" icon @click.stop="lastPage"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
        </template>
        <span>Last Page</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="isOverView" v-bind="attrs" v-on="on" icon @click.stop="nextPage"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
        </template>
        <span>Next Page</span>
      </v-tooltip>
		</v-toolbar>
		<v-carousel
			v-if="isOverviewPage"
			:continuous="false"
			:cycle="true"
			:show-arrows="true"
			show-arrows-on-hover
		>
			<v-carousel-item
				v-for="qa in qas"
				:key="qa.id"
				width="100%"
				height="100%"
			>
				<figure class="qaCard">
					<div class="profile-image">
						<img :src="qa.img" alt="qa profile" />
						<div class="icons">
							<h3>{{ qa.question }}</h3>
						</div>
					</div>
					<figcaption>
						<h3>Best Answer:</h3>
						<p>{{ qa.answer }}</p>
					</figcaption>
				</figure>
			</v-carousel-item>
		</v-carousel>

		<v-row v-if="!isOverviewPage">
			<v-col cols="12" sm="12" md="12" lg="6" v-for="qa in qas" :key="qa.id">
				<figure class="qaCard">
					<div class="profile-image">
						<img :src="qa.img" alt="qa profile" />
						<div class="icons">
							<h3>{{ qa.question }}</h3>
						</div>
					</div>
					<figcaption>
						<h3>Best Answer:</h3>
						<p>{{ qa.answer }}</p>
					</figcaption>
				</figure>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'QandA',
		props: {
			value: Boolean,
      isOverView: {
        default: false,
        type: Boolean
      }
		},
		data() {
			return {
				qas: [
					{
						img: 'https://i.pinimg.com/originals/d3/9e/10/d39e10a4c240194c788c2a9463bac286.gif',
						question: "I'm not a CityU student, can I register?",
						answer:
							'Why not? We welcome all Hong Kong undergraduate and postgraduate students.',
					},
					{
						img:
							'https://www.pngkey.com/png/full/357-3577496_discord-profile.png',
						question: 'Do I have to form a group? May I work by myself?',
						answer:
							'Students are encouraged to apply in a group with 3 to 5 persons. \
                    If you register individually, we will assign you to a group based on your role preference.',
					},
					{
						img:
							'https://www.storm.mg/images/election2020/game_people2.png',
						question: 'Do we have to attend the event physically?',
						answer:
							"Considering this year's special pandemic case, CityHack2021 will be held completely online. \
							Ceremonies and meetings will be conducted on online conference platform. And stay safe!",
					},
					{
						img:
							'https://upload.wikimedia.org/wikipedia/en/2/25/KyleBroflovski.png',
						question: 'What support will be offered during the competition?',
						answer:
							'Workshops will be provided to walk you through the topic background, accompanied by tutorials to get you started \
							in using the recommended software tools, e.g. AI Developing Kit. There will also have staffs on the spot\
							during the event to answer your enquiries regarding the technical issues.',
					},
					{
						img:
							'https://i.pinimg.com/originals/e9/77/da/e977da83b4bc48e3272a36f33430490a.png',
						question:
							'May I develop on and present some projects I already have done before?',
						answer: 'No. Your project must be built during the competition.',
					},
					{
						img:
							'https://cdn.pixabay.com/photo/2017/01/31/19/14/cartoon-2026568__340.png',
						question: 'How will teams be judged?',
						answer:
							'Generally speaking, we evaluate your project on \'Originality and creativity\', \'Content\', \'Practicality\', \
							\'Design and aesthetics\', \'Technical complexity\', \'Business model and pitching skills\', etc.',
					},
				],
			};
		},
		computed: {
			show: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
			isOverviewPage() {
				return this.$route.name === 'overview';
			},
		},
		methods: {
      nextPage() {
        this.$emit('next');
      },
      lastPage() {
        this.$emit('last');
      }
		},
	};
</script>

<style scoped>
	.qaCard {
		box-shadow: none !important;
		color: #141414;
		display: inline-block;
		font-family: 'Open Sans', Arial, sans-serif;
		font-size: 14px;
		line-height: 1.4em;
		/* margin: 10px;
  max-width: 515px;
  min-width: 430px; */
		position: relative;
		text-align: left;
		width: 100%;
	}

	.qaCard * {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.qaCard .profile-image img {
		border-radius: 5px;
		max-width: 100%;
		height: 80px;
		vertical-align: top;
		float: left;
	}

	.qaCard figcaption {
		background-color: #333333;
		border-radius: 5px;
		color: #fff;
		display: inline-block;
		margin-top: 15px;
		padding: 25px;
		position: relative;
		width: 100%;
	}

	.qaCard figcaption:after {
		border-color: transparent transparent #333333 transparent;
		border-style: solid;
		border-width: 0 10px 10px 10px;
		bottom: 100%;
		content: '';
		height: 0;
		left: 32px;
		position: absolute;
		width: 0;
	}

	.qaCard h3,
	.qaCard p {
		margin: 0 0 5px;
	}

	.qaCard h3 {
		font-weight: 600;
		font-size: 1.2em;
		font-family: 'Montserrat', Arial, sans-serif;
	}

	.qaCard p {
		font-size: 0.9em;
		letter-spacing: 1px;
		opacity: 0.9;
	}

	.qaCard .icons {
		padding: 20px 90px;
	}
</style>
