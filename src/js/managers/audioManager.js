/**
 * AudioManager - Singleton class to manage audio playback
 */
class AudioManager {
  constructor() {
    if (AudioManager.instance) {
      return AudioManager.instance;
    }

    this.alarmSound = document.getElementById("alarm-sound");
    this.volume = 0.7; // Default volume
    this.initialize();

    AudioManager.instance = this;
  }

  /**
   * Initialize audio settings
   */
  initialize() {
    if (!this.alarmSound) {
      console.error("Alarm sound element not found");
      return;
    }

    this.alarmSound.volume = this.volume;
    this.isPlaying = false;
  }

  /**
   * Play the alarm sound
   */
  playAlarm() {
    if (!this.alarmSound) return;

    // Reset sound to start if it's already playing
    this.alarmSound.pause();
    this.alarmSound.currentTime = 0;

    // Play the sound
    this.alarmSound
      .play()
      .then(() => {
        this.isPlaying = true;
        console.log("Alarm sound playing");
      })
      .catch((error) => {
        console.error("Error playing alarm sound:", error);
      });
  }

  /**
   * Stop the alarm sound
   */
  stopAlarm() {
    if (!this.alarmSound) return;

    this.alarmSound.pause();
    this.alarmSound.currentTime = 0;
    this.isPlaying = false;
  }

  /**
   * Set the volume of the alarm sound
   * @param {number} level - Volume level (0.0 to 1.0)
   */
  setVolume(level) {
    if (level < 0 || level > 1) {
      console.error("Volume level must be between 0 and 1");
      return;
    }

    this.volume = level;
    if (this.alarmSound) {
      this.alarmSound.volume = this.volume;
    }
  }

  /**
   * Check if the alarm is currently playing
   * @returns {boolean} - Whether the alarm is playing
   */
  isAlarmPlaying() {
    return this.isPlaying;
  }
}

// Create and export the singleton instance
const audioManager = new AudioManager();
