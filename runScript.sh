# Take argument 
# value should 1 or 2 or 3, if none provided throw error
# If not 1 or 2 or 3, throw error

# Check number of args
if [ $# -ne 1 ]
then
    echo "Usage: $0 auctionNumber"
    exit 1
fi

# Check if auctionNumber is 1 or 2 or 3
if [ $1 -ne 1 ] && [ $1 -ne 2 ] && [ $1 -ne 3 ]
then
    echo "Auction number should be 1 or 2 or 3"
    exit 1
fi

# Run switch case
case $1 in
    1)
        echo "Running auction 1"
        ./runA1
        ;;
    2)
        echo "Running auction 2"
        echo "Not implemented"
        ;;
    3)
        echo "Running auction 3"
        echo "Not implemented"
        ;;
esac