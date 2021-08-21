T castOrFallback<T>(dynamic x, {required T fallback}) => x is T ? x : fallback;

T? castOrNull<T>(dynamic x) => x is T ? x : null;
