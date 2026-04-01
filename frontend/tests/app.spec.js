import { test, expect } from '@playwright/test'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const BASE = 'http://localhost:5173/copy-writer-demo/'
const TEST_IMAGE = join(dirname(fileURLToPath(import.meta.url)), 'test-property.png')

test.describe('Page 1: Copy Transformer', () => {
  test('loads with header, prominent nav tabs, voice selector, and presets', async ({ page }) => {
    await page.goto(BASE)

    await expect(page.locator('h1')).toHaveText('SD Copy Transformer')

    // Nav tabs should be clearly visible
    const copyTab = page.locator('.nav-tab', { hasText: 'Copy Transformer' })
    const imageTab = page.locator('.nav-tab', { hasText: 'Image' })
    await expect(copyTab).toBeVisible()
    await expect(imageTab).toBeVisible()
    await expect(copyTab).toHaveClass(/active/)

    // 4 brand chips
    await expect(page.locator('.brand-chip')).toHaveCount(4)
    // 4 style dropdowns
    await expect(page.locator('.style-dropdown')).toHaveCount(4)
    // 3 preset tiles
    await expect(page.locator('.preset-tile')).toHaveCount(3)
  })

  test('clicking preset loads comparison with channel tabs and readability', async ({ page }) => {
    await page.goto(BASE)
    await page.locator('.preset-tile', { hasText: 'Safari' }).click()

    // Comparison panels
    await expect(page.locator('.panel-header.input')).toBeVisible()
    await expect(page.locator('.panel-header.output')).toBeVisible()

    // Channel tabs on output
    for (const tab of ['Website', 'Instagram', 'Brochure', 'TE Briefing']) {
      await expect(page.locator('.channel-tab', { hasText: tab })).toBeVisible()
    }

    // Readability gauge with scale legend
    await expect(page.locator('.gauge-score').first()).toBeVisible()
    await expect(page.locator('.gauge-scale').first()).toBeVisible()
    await expect(page.locator('.gauge-desc').first()).toBeVisible()

    // Quality scores (5 input + 5 output = 10)
    await expect(page.locator('.score-row')).toHaveCount(10)
  })

  test('channel tabs switch content', async ({ page }) => {
    await page.goto(BASE)
    await page.locator('.preset-tile', { hasText: 'Ski' }).click()

    const websiteText = await page.locator('.channel-content .panel-text').textContent()
    await page.locator('.channel-tab', { hasText: 'Instagram' }).click()
    const instaText = await page.locator('.channel-content .panel-text').textContent()

    expect(websiteText).not.toEqual(instaText)
    expect(instaText.length).toBeLessThan(websiteText.length)
  })

  test('switching voice changes preset output text', async ({ page }) => {
    await page.goto(BASE)

    // Load Beach with Scott Dunn
    await page.locator('.preset-tile', { hasText: 'Beach' }).click()
    const sdText = await page.locator('.channel-content .panel-text').textContent()

    // Switch to Competitor OTA, reload preset
    await page.locator('.brand-chip', { hasText: 'Competitor' }).click()
    await page.locator('.preset-tile', { hasText: 'Beach' }).click()
    const btText = await page.locator('.channel-content .panel-text').textContent()

    expect(sdText).not.toEqual(btText)
    expect(btText).toContain('feeling')
  })

  test('all 4 voices x 3 presets load correctly', async ({ page }) => {
    await page.goto(BASE)

    const voices = ['Scott Dunn', 'SD Private', 'Explorers', 'Competitor']
    const properties = ['Ski', 'Safari', 'Beach']

    for (const voice of voices) {
      await page.locator('.brand-chip', { hasText: voice }).click()
      for (const prop of properties) {
        await page.locator('.preset-tile', { hasText: prop }).click()
        await expect(page.locator('.channel-content .panel-text')).not.toBeEmpty()
        await expect(page.locator('.gauge-score').first()).toBeVisible()
      }
    }
  })
})

test.describe('Page 2: Image & Copy Studio', () => {
  test('nav tab switches to image page with upload area', async ({ page }) => {
    await page.goto(BASE)

    await page.locator('.nav-tab', { hasText: 'Image' }).click()

    // Image tab should now be active
    await expect(page.locator('.nav-tab', { hasText: 'Image' })).toHaveClass(/active/)

    // Should see image upload zone
    await expect(page.locator('.image-dropzone')).toBeVisible()
    await expect(page.locator('.image-textarea')).toBeVisible()

    // Default mode is generate
    await expect(page.locator('.image-mode-indicator')).toContainText('Image to Copy')

    // Button disabled without image
    await expect(page.locator('.transform-btn')).toBeDisabled()
  })

  test('uploading image shows preview and enables button', async ({ page }) => {
    await page.goto(BASE)
    await page.locator('.nav-tab', { hasText: 'Image' }).click()

    // Upload test image
    await page.locator('input[type="file"]').setInputFiles(TEST_IMAGE)

    // Preview should appear
    await expect(page.locator('.image-preview')).toBeVisible()

    // Button should be enabled with correct label
    const btn = page.locator('.transform-btn')
    await expect(btn).toBeEnabled()
    await expect(btn).toHaveText('Generate Copy')
  })

  test('adding text switches to alignment mode', async ({ page }) => {
    await page.goto(BASE)
    await page.locator('.nav-tab', { hasText: 'Image' }).click()

    await expect(page.locator('.image-mode-indicator')).toContainText('Image to Copy')

    await page.locator('.image-textarea').fill('A luxury overwater villa with sunset views')

    await expect(page.locator('.image-mode-indicator')).toContainText('Alignment')

    // Upload image too
    await page.locator('input[type="file"]').setInputFiles(TEST_IMAGE)
    await expect(page.locator('.transform-btn')).toHaveText('Check Alignment')
  })

  test('remove button clears image and disables submit', async ({ page }) => {
    await page.goto(BASE)
    await page.locator('.nav-tab', { hasText: 'Image' }).click()

    await page.locator('input[type="file"]').setInputFiles(TEST_IMAGE)
    await expect(page.locator('.image-preview')).toBeVisible()

    await page.locator('.image-clear-btn').click()

    await expect(page.locator('.image-dropzone')).toBeVisible()
    await expect(page.locator('.transform-btn')).toBeDisabled()
  })
})

test.describe('Voice Selector & Navigation', () => {
  test('style dropdowns update when brand chip clicked', async ({ page }) => {
    await page.goto(BASE)

    await page.locator('.brand-chip', { hasText: 'Explorers' }).click()
    await expect(page.locator('.style-dropdown').first()).toHaveValue('joyful_reassuring')

    await page.locator('.brand-chip', { hasText: 'Competitor' }).click()
    await expect(page.locator('.style-dropdown').first()).toHaveValue('philosophical_emotional')
  })

  test('voice guide title and tags update per voice', async ({ page }) => {
    await page.goto(BASE)

    const guideTitle = page.locator('.voice-guide h3')
    await expect(guideTitle).toContainText('Scott Dunn')

    await page.locator('.brand-chip', { hasText: 'Competitor' }).click()
    await expect(guideTitle).toContainText('Competitor')

    // Tone tags should change
    await expect(page.locator('.tone-tag', { hasText: 'Philosophical' })).toBeVisible()
  })

  test('switching pages preserves voice selection', async ({ page }) => {
    await page.goto(BASE)

    // Select Explorers voice
    await page.locator('.brand-chip', { hasText: 'Explorers' }).click()

    // Switch to Image page
    await page.locator('.nav-tab', { hasText: 'Image' }).click()

    // Voice should still be Explorers
    await expect(page.locator('.brand-chip', { hasText: 'Explorers' })).toHaveClass(/active/)
    await expect(page.locator('.voice-guide h3')).toContainText('Explorers')

    // Switch back - still Explorers
    await page.locator('.nav-tab', { hasText: 'Copy Transformer' }).click()
    await expect(page.locator('.brand-chip', { hasText: 'Explorers' })).toHaveClass(/active/)
  })
})
