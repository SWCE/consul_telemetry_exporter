test:
	echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	./node_modules/.bin/jshint ./test ./bin ./lib ./routes ./app.js
	@NODE_ENV=test ./node_modules/.bin/mocha -b --reporter spec
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && \
		cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js || true

.PHONY: test
