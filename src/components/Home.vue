<template>
  <!-- Header with full-height image -->
  <div class="header-background w3-display-container w3-grayscale-min" id="home">
    <div class="w3-display-left w3-text-white" style="padding:48px">
      <span class="w3-jumbo w3-hide-small">Private Fitness Services</span><br>
      <span class="w3-xxlarge w3-hide-large w3-hide-medium">Private Fitness Services</span><br>
      <span class="w3-large">Start automating processes in your fitness club right now.</span>
      <p><a href="#about"
            class="button-learn-more w3-button  w3-padding-large w3-margin-top w3-hover-opacity-off">Learn
        more and start today</a></p>
    </div>
  </div>

  <!--   About Section-->
  <div class="w3-container" style="padding:128px 16px" id="about">
    <h3 class="w3-center">ABOUT PFS</h3>
    <p class="w3-center w3-large">Key features of our company</p>
    <div class="w3-row-padding w3-center" style="margin-top:64px">
      <div class="w3-quarter">
        <i class="fa fa-desktop w3-margin-bottom w3-jumbo w3-center"></i>
        <p class="w3-large">Progressive</p>
        <p>Designed to help your business expand, maintaining comprehensive records, engaging with customers with
          guaranteed success.</p>
      </div>
      <div class="w3-quarter">
        <i class="fa fa-heart w3-margin-bottom w3-jumbo"></i>
        <p class="w3-large">Caring</p>
        <p>We will help your clients get from the ground to the stars with your programs and constant supervision of our
          experts and team.</p>
      </div>
      <div class="w3-quarter">
        <i class="fa fa-diamond w3-margin-bottom w3-jumbo"></i>
        <p class="w3-large">Professional</p>
        <p>Our expert fitness services are tailored to your company’s needs, enhancing employee health and driving
          business success.</p>
      </div>
      <div class="w3-quarter">
        <i class="fa fa-cog w3-margin-bottom w3-jumbo"></i>
        <p class="w3-large">Supportive</p>
        <p>We provide personalized fitness support to help your team grow, creating a healthy and positive work
          environment.</p>
      </div>
    </div>
  </div>

  <!--   Promo Section - "Info" -->
  <div class="w3-container w3-light-grey" style="padding:128px 16px" id="promo">
    <div class="w3-row-padding">
      <div class="w3-col m6">
        <div style="vertical-align: center">
          <h3>We got you!</h3>
          <p>Boost your team's productivity and well-being with our tailored corporate<br>fitness programs.
            For a limited time, get 20% off your first month! Invest in health, see results in performance - contact us
            today to get started!</p>
          <div class="content-list-container">
            <ol>
              <li>personal accounts for administrators, trainers, clients</li>
              <li>easy schedule management</li>
              <li>fast registrations and cancel</li>
              <li>easy season tickets management</li>
            </ol>
          </div>
          <p><a href="#contact" class="w3-button button-border-transition">Get started!</a></p>
        </div>
      </div>
      <div class="w3-col m6 img-half-right-container">
        <img class="w3-image w3-grayscale-min home-info-img" src="../assets/images/climbing.jpg" alt="Climbing">
      </div>
    </div>
  </div>

  <!-- Promo Section "Statistics" -->
  <div class="w3-container w3-row w3-center w3-dark-grey w3-padding-64" id="statistics">
    <div class="w3-quarter">
      <span class="w3-xxlarge">150+</span>
      <br>Businesses
    </div>
    <div class="w3-quarter">
      <span class="w3-xxlarge">15+</span>
      <br>Investors
    </div>
    <div class="w3-quarter">
      <span class="w3-xxlarge">150M</span>
      <br>Happy Clients
    </div>
    <div class="w3-quarter">
      <span class="w3-xxlarge">10+</span>
      <br>Different Countries
    </div>
  </div>

  <!-- Skills Section -->
  <div class="w3-container w3-light-grey w3-padding-64" id="skills">
    <div class="w3-row-padding">
      <div class="w3-col m6">
        <h3>Our Skills.</h3>
        <p style="margin-top: 10px">Our tailored programs boost energy levels, reduce stress, and improve focus,
          leading to enhanced productivity and collaboration. Your team will feel more motivated,
          healthier, and ready to perform at their best every day.</p>
        <p style="margin-top: 10px">Our fitness services foster a positive, inclusive culture that promotes well-being
          and
          team spirit. By prioritizing employee health, you demonstrate a commitment to their well-being,
          which improves job satisfaction and also reduces turnover. A healthier, happier
          team is more loyal and engaged.</p>
      </div>
      <div class="w3-col m6">
        <p class="w3-wide"><i class="fa fa-gears w3-margin-right"></i>Automatization</p>
        <div class="w3-grey">
          <div class="w3-container w3-dark-grey w3-center" style="width:90%">90%</div>
        </div>
        <p class="w3-wide"><i class="fa fa-keyboard-o w3-margin-right"></i>Speed</p>
        <div class="w3-grey">
          <div class="w3-container w3-dark-grey w3-center" style="width:85%">80%</div>
        </div>
        <p class="w3-wide"><i class="fa fa-star w3-margin-right"></i>Service quality</p>
        <div class="w3-grey">
          <div class="w3-container w3-dark-grey w3-center" style="width:90%">90%</div>
        </div>
      </div>
    </div>
  </div>

  <div class="w3-center" style="margin-top: 6em; margin-bottom: 6em">
    <div>
      <h1>Our locations</h1>
    </div>
    <div>
      <p>We are the largest fitness service providers worldwide.</p>
    </div>
    <div class="content-map-background">
      <div class="content-map-container">
        <iframe class="container-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8356373709055!2d144.96328031591252!3d-37.8136289808796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%253A0x5045675218ce6e41!2sMelbourne+VIC%252C+Australia!5e0!3m2!1sen!2sus!4v1508078861959"
                allowfullscreen></iframe>
      </div>
    </div>
  </div>
  <!--  <script>-->
  <!--    // Toggle between showing and hiding the sidebar when clicking the menu icon-->
  <!--    var mySidebar = document.getElementById("mySidebar");-->

  <!--    function w3_open() {-->
  <!--      if (mySidebar.style.display === 'block') {-->
  <!--        mySidebar.style.display = 'none';-->
  <!--      } else {-->
  <!--        mySidebar.style.display = 'block';-->
  <!--      }-->
  <!--    }-->

  <!--    // Close the sidebar with the close button-->
  <!--    function w3_close() {-->
  <!--      mySidebar.style.display = "none";-->
  <!--    }-->
  <!--  </script>-->

  <!--  <div class="w3-container">-->
  <!--    <hr>-->
  <!--    <div class="w3-center">-->
  <!--      <h1>CRM Fitness</h1>-->
  <!--      <h2>Best Private Services Program for Fitness Clubs</h2>-->
  <!--      <h6>Designed to help your business expand, maintaining comprehensive records,-->
  <!--        engaging with customers and devising effective marketing strategies.</h6>-->
  <!--      <button type="submit" class="w3-button w3-block w3-dark-grey">Send</button>-->
  <!--    </div>-->
  <!--    <div class="content-background">-->
  <!--      <div class="content-container">-->
  <!--        <div class="content-centered-text-container">-->
  <!--          <div>-->

  <!--          </div>-->
  <!--          <div>-->

  <!--          </div>-->
  <!--          <div class="content-small-text">-->
  <!--            *14 days of free trial-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="content-centered-button-container">-->
  <!--          <a class="link link-is-button theme-dark-background" data-component-name="link" href="#down"-->
  <!--             aria-label="Start Trial">-->
  <!--            <span class="link-text" property="name">-->
  <!--              Start Trial-->
  <!--            </span>-->
  <!--          </a>-->
  <!--        </div>-->

  <!--        <div class="content-image-list-container">-->
  <!--          <div>-->
  <!--            <div class="content-image-container">-->
  <!--              <img src="resources/images/yoga.jpg"-->
  <!--                   height="380"-->
  <!--                   alt="PrivateFitnessServices" style="color: black; padding-left: 50px">-->
  <!--            </div>-->
  <!--            <div class="content-text-list-container">-->
  <!--              <div>-->
  <!--                <h2 class="content-h2">Tasks Solved by Private Fitness Services for Fitness Clubs</h2>-->
  <!--                <div class="content-h3-and-list-container">-->
  <!--                  <h3 class="content-h3">Web service for customers</h3>-->
  <!--                  <div class="content-list-container">-->
  <!--                    <ol>-->
  <!--                      <li>collecting leads</li>-->
  <!--                      <li>sales funnel management</li>-->
  <!--                      <li>call plan and scheduling</li>-->
  <!--                      <li>conversation scenarios</li>-->
  <!--                      <li>task calendar and reminders</li>-->
  <!--                    </ol>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--                <div class="content-h3-and-list-container">-->
  <!--                  <h3 class="content-h3">CRM-system</h3>-->
  <!--                  <div class="content-list-container">-->
  <!--                    <ol>-->
  <!--                      <li>linking season tickets to specific locker room types (premium, standard, etc.)</li>-->
  <!--                      <li>inclusion of additional services with predefined limits</li>-->
  <!--                      <li>creation of both network-wide and local subscriptions</li>-->
  <!--                      <li>flexible payment schedules for season tickets and cards</li>-->
  <!--                      <li>setting up different types of subscriptions (membership fee, trial, additional)</li>-->
  <!--                    </ol>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--                <div class="content-h3-and-list-container">-->
  <!--                  <h3 class="content-h3">Season Tickets and Cards</h3>-->
  <!--                  <div class="content-list-container">-->
  <!--                    <ol>-->
  <!--                      <li>sale of season tickets</li>-->
  <!--                      <li>convenient registration for training sessions</li>-->
  <!--                      <li>personal client account</li>-->
  <!--                      <li>free alerts for customers</li>-->
  <!--                      <li>evaluation of coaches and clubs</li>-->
  <!--                    </ol>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->

  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->

  <!--        <div class="content-centered-text-container">-->
  <!--          <div class="h1-content">-->
  <!--            <h1>Why should you choose Private Services Program?</h1>-->
  <!--          </div>-->
  <!--          <div class="paragraph-content">-->
  <!--            <p>We will help your clients get from the GROUND to the STARS with your programs.</p>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="content-video-container">-->
  <!--          <video class="content-video" width="100%" controls>-->
  <!--            <source src="resources/video/swimmers.mp4" type="video/mp4">-->
  <!--            Your browser does not support the video tag.-->
  <!--          </video>-->
  <!--        </div>-->
  <!--        <div class="content-form-background-color" id="down">-->
  <!--          <div class="content-centered-text-container">-->
  <!--            <div class="h1-content">-->
  <!--              <h1 style="padding-top: 30px;">Changes begin here!</h1>-->
  <!--            </div>-->
  <!--            <div class="paragraph-content">-->
  <!--              <p>Start automating processes in your fitness club right now</p>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="content-form-background">-->
  <!--            <div class="content-form-container">-->
  <!--              <form action="" method="post">-->
  <!--                <div class="content-form-fields">-->
  <!--                  <div class="form-group">-->
  <!--                    <p class="content-text-">First Name</p>-->
  <!--                    <input type="text" class="form-control form-control-lg">-->
  <!--                  </div>-->
  <!--                  <div class="form-group">-->
  <!--                    <p class="content-text-">Last Name</p>-->
  <!--                    <input type="text" name="lname" class="form-control form-control-lg">-->
  <!--                  </div>-->
  <!--                  <div class="form-group">-->
  <!--                    <p class="content-text-">Email</p>-->
  <!--                    <input type="email" name="email" class="form-control form-control-lg">-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </form>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="content-centered-button-container">-->
  <!--            <a class="link link-is-button theme-dark-background" data-component-name="link"-->
  <!--               aria-label="Start Trial">-->
  <!--            <span class="link-text" property="name">-->
  <!--              Start Trial-->
  <!--            </span>-->
  <!--            </a>-->
  <!--          </div>-->
  <!--        </div>-->

  <!--      </div>-->
  <!--    </div>-->
  <!--    <footer class="footer">-->
  <!--      <div class="header-background">-->
  <!--        <div class="header-blocks-container">-->
  <!--          <div class="header-elements-container">-->
  <!--            <div class="logo-container">-->
  <!--              <img src="resources/images/icon.png" height="70" alt="PrivateFitnessServices" style="color: black">-->
  <!--            </div>-->
  <!--            <div class="header-pfs">-->
  <!--              <div>-->
  <!--                <h1 class="h1-header">PFS</h1>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="header-description-container">-->
  <!--              <div class="header-description-elements-container">-->
  <!--                <h2>Private Fitness Services</h2>-->
  <!--                <h4>World's best choice for sport services</h4>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </footer>-->
  <!--  </div>-->
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Home",
  data() {
    return {lastScrollTop: 0}
  },
  created() {
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const header = document.querySelector('.header-background');

      if (scrollTop > this.lastScrollTop) {
        // Scrolling down
        header.classList.add('gray-filter');
      } else {
        // Scrolling up
        header.classList.remove('gray-filter');
      }

      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Avoid negative values
    }
  }
})
</script>

<style scoped>

</style>