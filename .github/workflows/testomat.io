name: Testomat reporting

on:
  workflow_dispatch:
    inputs:
      grep:
        description: 'tests to grep '
        required: false
        default: ''
      run:
        required: false
      testomatio:
        required: false
      testomatio_url:
        required: false

jobs:
  testomat_reporting:
    runs-on: ubuntu-latest
      container:
      image: mcr.microsoft.com/playwright:v1.36.1-jammy
      env:
        ADMIN_USERNAME: ${{ secrets.ADMIN_USERNAME }}
        ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          
      - name: Run application
        run: chmod +x ././shopping-store-linux-amd64
          ./shopping-store-linux-amd64 &

      - name: Setup dependencies
        run: npm ci

      - name: Playwright browser updates
        run: npx playwright install

      - name: Run tests
        run: npx playwright test --grep "${{ github.event.inputs.grep }}"
        env:
          TESTOMATIO: '${{ secrets.TESTOMATIO }}'
          TESTOMATIO_RUN: '${{ github.event.inputs.run }}'
