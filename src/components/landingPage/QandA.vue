
<!-- TODO: modify  
1. choose arrow or delimiter 
2. make sure mobile looks ok.
https://vuetifyjs.com/en/api/v-carousel/
https://vuetifyjs.com/en/components/carousels/ -->
<template>
	<v-container>
		<v-toolbar flat class="mb-5">
			<v-toolbar-title>CityHack 2021 Q&A</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click.stop="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-carousel v-if='isOverviewPage'
			:continuous="false"
			:cycle="true"
			:show-arrows="true"
      show-arrows-on-hover
		>
			<v-carousel-item v-for="qa in qas" :key="qa.id" width='100%' height='100%'>
				<!-- <v-sheet :color="colors[i]" height="100%" tile>
					<v-row class="fill-height" align="center" justify="center">
						<div class="display-3">{{ slide }} Slide</div>
					</v-row>
				</v-sheet> -->
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

		<v-row v-if='!isOverviewPage'>
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
		},
		data() {
			return {
				qas: [
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample1.jpg',
						question: "I'm not a CityU student, can I register?",
						answer:
							'Why not? We welcome all Hong Kong undergraduate and postgraduate students.',
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg',
						question: 'Do I have to form a group? May I work by myself?',
						answer:
							'Students are encouraged to apply in a group with 3 to 5 persons. \
                    If you register individually, we will assign you to a group based on your role preference.',
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg',
						question: 'Do we have to attend the event physically?',
						answer:
							"Considering this year's special pandemic case, CityHack2021 will be held completely online. \
                    Ceremonies and meetings will be conducted on online conference platform. And stay safe!",
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg',
						question:
							'What are the topics about and expected deliverables for this competition?',
						answer:
							'The competition will be AI-related, though detailed information will be announced during the opening ceremony. \
                  Expected outcomes for the competition can range from a product (e.g. Website, Mobile App), \
                  a solution (e.g. a predictive model, a pipeline) for the provided problems to beyond the universe.',
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample3.jpg',
						question: 'What support will be offered during the competition?',
						answer:
							'Workshops will be provided to walk you through the topic background, accompanied by tutorials to get you started \
                  in using the recommended software tools, e.g. AI Developing Kit. There will also have staffs on the spot\
                  during the event to answer your enquiries regarding the technical issues.',
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg',
						question:
							'May I develop on and present some projects I already have done before?',
						answer: 'No. Your project must be built during the competition.',
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample7.jpg',
						question: 'How will teams be judged?',
						answer:
							'We will have preliminary round for selection, followed by a second round, a third round, a forth round, etc...',
					},
					{
						img:
							'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample8.jpg',
						question: 'How do we present our project?',
						answer: 'Get to the top of Burj Khalifa and livestream there.',
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
      isOverviewPage: () => true
		},
		methods: {
			close() {
				this.$emit('close');
			},
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
