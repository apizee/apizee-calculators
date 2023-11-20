# Apizee Calculators

Here are some costs and savings calculators in the fields addressed by Apizee solutions.

- [Truck Roll Cost Calculator](https://apizee.github.io/apizee-calculators/truck-roll-calculator/)
- [Truck Roll Cost Calculator (extended)](https://apizee.github.io/apizee-calculators/truck-roll-calculator-extended/en/)

## Requirements

- ruby
- bundler
- jekyll

## Installation notes

```bash
# Install Ruby et bundler
sudo apt update
sudo apt upgrade
sudo apt install ruby-full bundler

# Install jekyll
gem install jekyll

# Install Gems listed in the Gemfile
bundle install
```

Additional package - Bun needed to run the tests

```bash
curl -fsSL https://bun.sh/install | bash 
```

## Development environment

### Run the tests

```bash
bun --watch test
```

### How to generate a build of the site

```bash
bundle exec jekyll build
```

### How to serve site

```bash
bundle exec jekyll serve --watch
```

## Production

Deployed on Github Pages through Github Action standard deployment script.
