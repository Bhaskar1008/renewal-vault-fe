<template>
    <v-app>
		<v-toolbar dark color="primary">
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title class="white--text">STUDENT SYSTEM</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon>
				<v-icon>search</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>apps</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>refresh</v-icon>
			</v-btn>
			<v-menu bottom left>
					<v-btn icon slot="activator" dark>
					  <v-icon>more_vert</v-icon>
					</v-btn>
					<v-list>
					  <v-list-tile v-for="(item, i) in items" :key="i" >
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					  </v-list-tile>
					</v-list>
				  </v-menu>
		</v-toolbar>
		<div>
				<v-breadcrumbs divider="/">
					<v-breadcrumbs-item
					  v-for="item in linkList"
					  :key="item.text"
					  :disabled="item.disabled"
					>
					  {{ item.text }}
					</v-breadcrumbs-item>
				  </v-breadcrumbs>
		
		</div>
		
        <v-layout wrap>	
			<!-- Navigation -->

			
		  
            <v-navigation-drawer	
                temporary
                v-model="drawer"
                :mini-variant="mini"
                primary
				absolute
				class="primary" dark
            >
            <v-list class="pa-1">
                        <v-list-tile v-if="mini" @click.stop="mini = !mini">
                          <v-list-tile-action>
                            <v-icon>chevron_right</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile avatar tag="div">
                          <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-btn icon @click.stop="mini = !mini">
                              <v-icon>chevron_left</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                      <v-list class="pt-0" dense>
                        <v-divider light></v-divider>
                        <v-list-tile v-for="item in items" :key="item.title" >
                          <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-navigation-drawer>
				  </v-layout>
				  <v-footer height="auto" class="primary darken-2 footer-scroller">
						<v-layout row justify-center>
						  <v-btn
							color="white"
							flat
							v-for="link in links"
							:key="link"
						  >
							{{ link }}
						  </v-btn>
						  
						</v-layout>
					  </v-footer>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: null,
                items: [{
                    title: 'Home',
                    icon: 'dashboard'
                }, {
                    title: 'About',
                    icon: 'question_answer'
                }],
                mini: false,
                right: null,
                links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
                linkList: [{
                    text: 'Dashboard',
                    disabled: false
                }, {
                    text: 'Link 1',
                    disabled: false
                }, {
                    text: 'Link 2',
                    disabled: true
                }]
            }
        }
    }
</script>

<style scoped>
    .footer-scroller {
        overflow: auto;
    }
</style>