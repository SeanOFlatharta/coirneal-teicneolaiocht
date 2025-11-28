import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <div class="about-header">
        <h1>🍀 Cé muid féin - About Us</h1>
        <p class="subtitle">Preserving Irish Heritage Through Modern Technology</p>
      </div>

      <div class="content-sections">
        <div class="mission-section">
          <h2>📚 Ár Misean - Our Mission</h2>
          <div class="mission-content">
            <p class="lead-text">
              Welcome to <strong>Coirnéal Teicneolaíocht</strong> - where Irish tradition meets cutting-edge technology!
              We are passionate about preserving and promoting the beautiful Irish language (Gaeilge) through innovative,
              child-friendly digital experiences.
            </p>

            <div class="highlight-box">
              <h3>🌟 Why Irish Language Learning Matters</h3>
              <p>
                Irish (Gaeilge) is not just a language - it's a gateway to our rich cultural heritage, our stories,
                and our identity. By making Irish language learning fun and accessible for young children, we're
                ensuring that future generations can connect with their roots and keep this ancient language alive.
              </p>
            </div>
          </div>
        </div>

        <div class="vision-section">
          <h2>🎯 Our Vision for Young Learners</h2>
          <div class="vision-grid">
            <div class="vision-card">
              <div class="vision-icon">🧒👧</div>
              <h3>For Children Aged 3-12</h3>
              <p>Our interactive tools are specifically designed for young minds, making Irish language learning
              engaging, colorful, and fun through games, sounds, and visual aids.</p>
            </div>

            <div class="vision-card">
              <div class="vision-icon">🎵</div>
              <h3>Audio-First Learning</h3>
              <p>Children learn best through listening and repetition. Our alphabet app features native Irish
              pronunciation to help kids develop authentic accent and pronunciation from day one.</p>
            </div>

            <div class="vision-card">
              <div class="vision-icon">🎮</div>
              <h3>Learning Through Play</h3>
              <p>We believe learning should be joyful! Our interactive approach turns language acquisition
              into an adventure, keeping children engaged and excited about Irish culture.</p>
            </div>

            <div class="vision-card">
              <div class="vision-icon">🏠</div>
              <h3>Family-Friendly</h3>
              <p>Parents and grandparents can learn alongside their children, creating shared experiences
              and strengthening family connections to Irish heritage.</p>
            </div>
          </div>
        </div>

        <div class="heritage-section">
          <div class="heritage-content">
            <div class="heritage-text">
              <h2>🏰 Our Irish Heritage</h2>
              <p>
                The <strong>Flaherty</strong> (Ó Flaithbheartaigh) name carries centuries of Irish history.
                Our ancestors were proud guardians of Irish culture, and today we continue that tradition
                by using modern technology to share our language and heritage with the world.
              </p>
              <p>
                From the ancient kingdoms of Connacht to today's digital classrooms, we're bridging
                generations through the power of Gaeilge. Every child who learns to say "A, B, C" in
                Irish is carrying forward a tradition that spans over 1,500 years.
              </p>

              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-number">1,500+</span>
                  <span class="stat-label">Years of Irish Language History</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">18</span>
                  <span class="stat-label">Letters in Irish Alphabet</span>
                </div>
                <div class="stat-item">
                  <span class="stat-number">∞</span>
                  <span class="stat-label">Possibilities for Young Minds</span>
                </div>
              </div>
            </div>

            <div class="heritage-image">
              <div class="image-container">
                <img src="assets/flaherty_crest.jpg" alt="Flaherty Family Crest - Symbol of Irish Heritage">
                <p class="image-caption">
                  <strong>Flaherty Family Crest</strong><br>
                  <em>"Fortuna audaces iuvat" - Fortune favors the bold</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="technology-section">
          <h2>💻 Modern Tools for Ancient Wisdom</h2>
          <p>
            This website represents more than just code - it's a bridge between our technological expertise
            and our cultural mission. Built with modern web technologies like Angular, Node.js, and
            responsive design, we create digital spaces where Irish culture can flourish.
          </p>

          <div class="tech-mission">
            <div class="tech-point">
              <strong>🎨 User Experience:</strong> Every button, color, and interaction is designed with children in mind
            </div>
            <div class="tech-point">
              <strong>📱 Mobile-First:</strong> Learning happens everywhere - at home, in the car, or during quiet moments
            </div>
            <div class="tech-point">
              <strong>🔊 Audio Quality:</strong> Crystal-clear pronunciation helps build confidence in speaking Irish
            </div>
            <div class="tech-point">
              <strong>📊 Progress Tracking:</strong> Parents can see their child's journey and celebrate milestones
            </div>
          </div>
        </div>

        <div class="call-to-action">
          <h2>🌟 Join Our Mission</h2>
          <p>
            Whether you're a parent wanting to share Irish culture with your children, a teacher looking
            for engaging classroom resources, or simply someone who believes in preserving linguistic
            diversity - you're part of our community.
          </p>
          <p class="cta-text">
            <strong>Together, we're not just teaching letters and sounds - we're nurturing the next generation
            of Irish speakers, one child at a time.</strong>
          </p>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

}